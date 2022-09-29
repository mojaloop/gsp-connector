# Contributing Guidelines

## How to Contribute

1. Fork this repository
2. Create a new branch
3. Submit a pull request

NOTE: To make the Pull Requests' (PRs) testing and merging process easier, please submit changes to multiple charts in separate PRs unless the changes are related.

### Technical Requirements

When submitting a PR make sure that it:

1. Must pass CI jobs for linting and test the changes on top of different k8s platforms.
2. Must follow best practices and coding standards.
3. Do NOT bump the version as versioning will be handled by our CI/CD release process using semver principles driving by [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). CI/CD will then automatically create Tagged/Github releases with an updated [CHANGELOG](./CHANGELOG.md), and then publish (including your changes) to our artefact (i.e. Docker, NPM, etc) repository.

### Documentation Requirements

1. [README.md](./README.md) must include:
   1. configuration options; and
   2. instructions on how to run and test this component

## Committing Changes

Git commits will execute the following pre-hook scripts:

- [commit-msg](./.husky/commit-msg): this will validate commit messages against [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standards.
- [pre-commit](./.husky/pre-commit): this will execute standard checks (e.g. lint, dependencies, audits, unit tests, etc) before allowing the commit to pass.

This can be avoided by using the `-n` (e.g. `git commit -n -m 'fix: bad bug'`) flag when committing changes as these checks are done as part of our CI/CD workflow, and are merely in place for the convenience of the developer.

## Releases

As part of our CI/CD process, we automatically trigger our releases and image builds on merges to `main` branch. This process essentially mimics a manual tag and release.

Once those changes are pushed to the `main` branch, CI/CD workflows will pull create a new tagged release (including an updated [CHANGELOG](./CHANGELOG.md)) using semantic versioning based on the commit history (using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)), this will then trigger off a GitHub release, followed by the publishing of any artifacts (i.e. Docker images, NPM libraries, etc).

## Snapshots

Snapshot releases are handled manually by the developer working from a branch (e.g. `fix/bad-bug-example`).

Snapshots can be triggered by running following command, which will:

  1. create a snapshot of the current version as `v#.#.#-snapshot.#`.
  2. commit changes to git locally.

```bash
npm run snapshot
```

You will need to then manually push the changes and the tag to Github:

```bash
git push --follow-tags
```

The automated CI-CD release process will then publish the snapshot artifact.
