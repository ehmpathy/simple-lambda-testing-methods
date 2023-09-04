# Changelog

## [0.5.2](https://github.com/ehmpathy/simple-lambda-testing-methods/compare/v0.5.1...v0.5.2) (2023-09-04)


### Bug Fixes

* **types:** support null body and options method on example api gateway event ([4a726b1](https://github.com/ehmpathy/simple-lambda-testing-methods/commit/4a726b1d422e4c57d834eaa7f0601eb051474c5e))

## [0.5.1](https://github.com/ehmpathy/simple-lambda-testing-methods/compare/v0.5.0...v0.5.1) (2023-07-26)


### Bug Fixes

* **pkg:** export the create example s3 event method ([8f6e35a](https://github.com/ehmpathy/simple-lambda-testing-methods/commit/8f6e35a6692296baf563460833d51dec6ab70e28))

## [0.5.0](https://github.com/ehmpathy/simple-lambda-testing-methods/compare/v0.4.1...v0.5.0) (2023-07-26)


### Features

* **events:** expose method to create exampe s3 event ([c7d3dd6](https://github.com/ehmpathy/simple-lambda-testing-methods/commit/c7d3dd66915797ae66d607c4339128ce1072c4a3))


### Bug Fixes

* **assumptions:** remove sanity check of stage vs env variable ([c35dc28](https://github.com/ehmpathy/simple-lambda-testing-methods/commit/c35dc287b5ea5d0028c2080b1d5af55b92133cf4))
* **practs:** upgrade best practices ([9365aed](https://github.com/ehmpathy/simple-lambda-testing-methods/commit/9365aed9201fc34c247baaeb64fa06fe58da9228))

### [0.4.1](https://www.github.com/uladkasach/simple-lambda-testing-methods/compare/v0.4.0...v0.4.1) (2022-02-24)


### Bug Fixes

* **exports:** actually expose the create example kinesis event method ([6e5db79](https://www.github.com/uladkasach/simple-lambda-testing-methods/commit/6e5db79e5d76dd017f4e7976329c97835aaef8a0))

## [0.4.0](https://www.github.com/uladkasach/simple-lambda-testing-methods/compare/v0.3.1...v0.4.0) (2022-02-24)


### Features

* **events:** expose method to create example kinesis event ([a656110](https://www.github.com/uladkasach/simple-lambda-testing-methods/commit/a6561106d6b95f456096ffbdee97c51775586894))

### [0.3.1](https://www.github.com/uladkasach/simple-lambda-testing-methods/compare/v0.3.0...v0.3.1) (2022-02-10)


### Bug Fixes

* **ci:** bump node version in ci so fromEntries doesn't break build ([8d40bf6](https://www.github.com/uladkasach/simple-lambda-testing-methods/commit/8d40bf68b60692cce991bcce7e6de21cd2c36e7d))

## [0.3.0](https://www.github.com/uladkasach/simple-lambda-testing-methods/compare/v0.2.1...v0.3.0) (2022-02-09)


### Features

* **events:** expose methods to create example lambda invocation events ([00293b8](https://www.github.com/uladkasach/simple-lambda-testing-methods/commit/00293b867507e9dc4088fc03827294aa5b0cd460))

### [0.2.1](https://www.github.com/uladkasach/simple-lambda-testing-methods/compare/v0.2.0...v0.2.1) (2022-02-05)


### Bug Fixes

* **deps:** upgrade deps based on npm audit ([df12779](https://www.github.com/uladkasach/simple-lambda-testing-methods/commit/df12779cd0d3cc837407555649affeec98450d31))
* **parity:** ensure that callback handlers dont have uncaught errors thrown ([5bb0894](https://www.github.com/uladkasach/simple-lambda-testing-methods/commit/5bb08949999848997d90c6f9fb9c677cec28c63b))
* **parity:** ensure that invoked handlers match live lambda output serialization ([bd0d1c1](https://www.github.com/uladkasach/simple-lambda-testing-methods/commit/bd0d1c1eb67ec08b00462de5641ce45fafbb270e))
