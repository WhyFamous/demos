## Demo.WhyFamo.us

> Demonstration repo for the github pages for demo.whyfamo.us
> Repo for the demo.whyfamo.us demo projects

---
### Building these demos with Famo.us and webpack

####Installation

```bash
npm install -g webpack webpack-dev-server # install webpack
git clone https://github.com/WhyFamous/demos # clone this repository
npm install # install dependencies
```

### Development

```bash
webpack-dev-server --reload=localhost
```

Now navigate to:

* [http://localhost:8080/boilerplate/index.html](http://localhost:8080/boilerplate/index.html)
* [http://localhost:8080/webpack-dev-server](http://localhost:8080/webpack-dev-server) (lists all bundles)

The optional `--reload=ip` flag [adds the live-reload snippet](https://github.com/markmarijnissen/webpack-reload-plugin) to your bundle(s).


### Production  

Note: You may use these demos publicly only with written email (support (@) whyfamo.us) confirmation/permission and the correct attribution back to each body of work. Any demo from a third party must fall under the original license of that project.

```bash
webpack --minify --env=production
```

* The optional `--minify` flag minifies the output.
* The optional `--env=xxx` flag sets a global `ENV` variable (default: `window.TARGET='dev'`).

---

## Contributors

Star this project!
If you want to contribute, fork and put in a Pull Request for review.  New demos are always welcome for review.

* Original code  [Tony Alves](https://github.com/talves/)
