# WIP

<div align="center">
    <div><img src="https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/cube.gif" /></div>
    <h2 align="center">cube.gif</h2>
    <p><i align="center">Volume Rendering and Slicing Gifs</i></p>
</div>

* [Site][site]
* [Documentation][documentation]

*[cube.gif](site)* is an experiment visualizing gifs as 3D volumes and taking 2D slices of this volume. This encodes animation time as another spatial dimension, that we can then project back into two dimensions to create images that capture multiple frames of the original animation.

The above image shows one of these gif cubes. The front left face is the first frame of the gif. Points on the front face of the cube map directly to pixels in the original gif's first frame. The third dimension forwards or backwards from the front face is time. This means that the left face capture the right most pixels of the gif over time. 

We can slice through the cube at angle angle to create a new 2d image. The slice plane here is the plane moving towards and away from the camera. Here's the slice of the above animation.

<div align="center"><img src="https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/slice.gif" /></div>

[See the documentation for more details][documentation]
.

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