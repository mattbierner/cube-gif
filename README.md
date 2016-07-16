# WIP

<div align="center">
    <div><img src="https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/main.gif" /></div>
    <h1 align="center">cube.gif</h1>
    <p><i align="center">cube gifs</i></p>
</div>

* [Site][site]
* [Documentation][documentation]

*[cube.gif](site)* 

## Building and Running
The website uses [Jekyll](http://jekyllrb.com/) and [Webpack](http://webpack.github.io/) for building:

```bash
$ git checkout gh-pages
$ npm install
```

Start Jekyll with:

```bash
$ jekyll serve -w
```

Start webpack with:

```bash
$ webpack --watch
```

Main Javascript is stored in `src` and output to `js`.


[site]: https://mattbierner.github.io/cube-gif/
[documentation]: https://github.com/mattbierner/cube-gif/blob/gh-pages/documentation/about.md