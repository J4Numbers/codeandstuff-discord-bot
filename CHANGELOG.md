# Changelog

#### 1.1.1 (2023-04-02)

##### Build System / Dependencies

* **npm:**
  *  move to snapshot versioning (f855b135)
  *  version bump to next beta version (e92b229a)

##### Documentation Changes

* **badge:**  use badge on main only (81a495eb)

##### Refactors

* **ami:**  ensure ami is always recommended (2e534b05)
* **vars:**  strip out non-sensitive vars to context (d0251f86)

#### 1.1.0 (2021-04-08)

##### Build System / Dependencies

* **npm:**
  *  version lock to 1.1.0 (4fced1cf)
  *  version bump (ba74aa0b)
  *  bump versions up as required (f6e9bbbd)
* **tf:**  shift version into variables (b8f380a4)

##### Chores

* **workflow:**  remove autogenned comments (eb5f5c39)

##### Continuous Integration

* **deploy:**
  *  only deploy on master (ade2f717)
  *  cd into terraform dir before applying (16eac8aa)
* **workflow:**  add manual trigger for now (9d75bb37)
* **tf:**  drag access keys down to terraform (3acedf88)
* **github:**  add github workflow action for deployment (c936b2ee)

##### Documentation Changes

* **readme:**  add deployment badge (cc28450c)

##### New Features

* **pair:**  added pair channel creation ability (aad2838b)
* **mentor:**  added mentor registration to entry (7c1cf47e)
* **tf:**  add placeholder terraform values (c429bca4)

##### Bug Fixes

* **ci:**  use actual terraform command args (11ad27b8)
* **workflow:**  cd into terraform directory (d0aaab76)
* **clean:**  use config values rather than strings (246b80e8)

##### Refactors

* **provider:**  use backend conf files (8facc668)
* **tf:**  convert kebab case to snake case (f9e341a5)

##### Code Style Changes

* **tf:**  minor spacing style fixes (9b0be1e8)

#### 1.0.0 (2021-04-06)

##### Build System / Dependencies

* **image:**  move to using hard image tags for deploys (f6094a69)
* **tf:**
  *  move to using s3 as a backend (af5a8199)
  *  drag in a terraform loader (c3e68636)
* **docker:**  fix up docker image and compose file (ff553840)
* **js:**  add in most of the framework elements (5a94fc35)
* **env:**  booted up a new environment of top-level files (f0627216)

##### Chores

* **eslint:**  minor eslint fixes (1b138589)

##### Documentation Changes

* **readme:**  add config example to readme (9bde21cd)
* **project:**  fill in documentation with direction (8dd8a578)

##### New Features

* **greet:**  added hello message and removed event roles (b2c1ec13)
* **event:**
  *  notify of no events on request (bb196c55)
  *  list all events on inquiry (9db3944b)
* **response:**  added responses to direct messages to the bot (bf101409)
* **role:**  added event-id roles (deb097d5)
* **axios:**  bring in an example axios call (fba52c85)
* **actions:**  start building the actions of the bot (753baa7f)
* **inital-commit:**  bring in node (aa7a9716)

##### Bug Fixes

* **discord:**  live testing in discord fixes (49f177d0)

##### Refactors

* **worker:**  add more exception handling (7363c09c)
* **defense:**  add some exception handling to handlers (61ece84d)
* **logs:**  minor refactor of misc items (c3d0e850)
* **events:**
  *  split eventbrite api from lookup (a0576251)
  *  moved tickets into events (444ed682)
* **event:**  defined events and tickets properly (c76ba000)
* **text:**  minor reformatting of typescript (4b574f5f)
* **quotes:**  singlify all the double quotes (68428b54)

##### Code Style Changes

* **messages:**  minor re-wording of messages (f78b8867)

