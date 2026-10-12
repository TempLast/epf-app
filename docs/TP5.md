# TP5 - DevSecOps

*** grep -riE "key|token|password|secret|webhook" --exclude-dir=node_modules . : ***

./package-lock.json:        "eslint-visitor-keys": "^3.4.3"
./package-lock.json:    "node_modules/@eslint-community/eslint-utils/node_modules/eslint-visitor-keys": {
./package-lock.json:      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-3.4.3.tgz",
./package-lock.json:        "path-key": "^3.1.0",
./package-lock.json:        "eslint-visitor-keys": "^4.2.1",
./package-lock.json:    "node_modules/eslint-visitor-keys": {
./package-lock.json:      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-4.2.1.tgz",
./package-lock.json:        "eslint-visitor-keys": "^4.2.1"
./package-lock.json:        "keyv": "^4.5.4"
./package-lock.json:    "node_modules/keyv": {
./package-lock.json:      "resolved": "https://registry.npmjs.org/keyv/-/keyv-4.5.4.tgz",
./package-lock.json:    "node_modules/path-key": {
./package-lock.json:      "resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
./.git/hooks/fsmonitor-watchman.sample:# The hook is passed a version (currently 2) and last update token
./.git/hooks/fsmonitor-watchman.sample:# formatted as a string and outputs to stdout a new update token and
./.git/hooks/fsmonitor-watchman.sample:# all files that have been modified since the update token. Paths must
./.git/hooks/fsmonitor-watchman.sample:my ($version, $last_update_token) = @ARGV;
./.git/hooks/fsmonitor-watchman.sample:# print STDERR "$0 $version $last_update_token\n";
./.git/hooks/fsmonitor-watchman.sample: # changed since $last_update_token but not from the .git folder.
./.git/hooks/fsmonitor-watchman.sample: if (substr($last_update_token, 0, 1) eq "c") {
./.git/hooks/fsmonitor-watchman.sample:         $last_update_token = "\"$last_update_token\"";
./.git/hooks/fsmonitor-watchman.sample:         $last_update_line = qq[\n"since": $last_update_token,];
./.git/hooks/fsmonitor-watchman.sample:         $last_update_token = $o->{clock};
./dist/package-lock.json:        "eslint-visitor-keys": "^3.4.3"
./dist/package-lock.json:    "node_modules/@eslint-community/eslint-utils/node_modules/eslint-visitor-keys": {
./dist/package-lock.json:      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-3.4.3.tgz",
./dist/package-lock.json:        "path-key": "^3.1.0",
./dist/package-lock.json:        "eslint-visitor-keys": "^4.2.1",
./dist/package-lock.json:    "node_modules/eslint-visitor-keys": {
./dist/package-lock.json:      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-4.2.1.tgz",
./dist/package-lock.json:        "eslint-visitor-keys": "^4.2.1"
./dist/package-lock.json:        "keyv": "^4.5.4"
./dist/package-lock.json:    "node_modules/keyv": {
./dist/package-lock.json:      "resolved": "https://registry.npmjs.org/keyv/-/keyv-4.5.4.tgz",
./dist/package-lock.json:    "node_modules/path-key": {
./dist/package-lock.json:      "resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",

---

*** git log -p | grep -iE "token|webhook|hook" | head ***

*** docker run --rm -v "$PWD:/repo" ghcr.io/gitleaks/gitleaks:v8.30.1 git /repo -v ***


