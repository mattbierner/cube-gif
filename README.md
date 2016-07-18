# WIP

<div align="center">
    <div><img src="https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/cube.gif" /></div>
    <h1 align="center">cube.gif</h1>
    <p><i align="center">cube gifs</i></p>
</div>

* [Site][site]
* [Documentation][documentation]

*[cube.gif](site)* is an experiment visulizing gifs as 3D volumes and taking 2D slices of this volume. This encodes the time aspect of the animation as another spartial dimension that is then projected back to create a two dimensional image.

The above image shows one of these image cubes. The front left face is the first frame of the gif. The axis going backwards from the front face is time. Therefore, left face capture the right most pixels of the gif over time. 

We can slice through the cube at angle angle to create a new 2d image. Here's the slice of the above animation.

<div align="center"><img src="https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/slice.gif" /></div>

[See the documentation for more details][documentation].

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