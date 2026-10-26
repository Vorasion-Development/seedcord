import { Converters, Envapter } from 'envapt';

import { GitHubApi } from '#src/lib/GitHubApi';

const isCiPath = (path: string): boolean => /^\.github\/(workflows|actions)\//.test(path);

const REVIEW_RULES = [
    { reviewers: ['SerenModz21'], matches: () => true },
    { reviewers: ['KTrain5169'], matches: (paths: readonly string[]) => paths.some(isCiPath) }
];

Envapter.strict = true;

const env = Envapter.getRequiredAll({
    GITHUB_REPOSITORY: Converters.String,
    PR_NUMBER: Converters.Integer,
    GITHUB_TOKEN: Converters.String
});
const api = new GitHubApi(env.GITHUB_REPOSITORY, env.GITHUB_TOKEN);
const files = await api.pullRequestFiles(env.PR_NUMBER);
const paths = files.flatMap(({ filename, previous_filename: previousFilename }) =>
    previousFilename === undefined ? [filename] : [filename, previousFilename]
);
const reviewers = REVIEW_RULES.filter(({ matches }) => matches(paths)).flatMap(({ reviewers }) => reviewers);

await api.requestMissingReviews(env.PR_NUMBER, reviewers);
