# About cube.gif

*[cube.gif](site)* is an experiment visualizing gifs as 3D volumes and taking 2D slices of this volume. This encodes animation time as another spatial dimension, that we can then project back into two dimensions to create images that capture multiple frames of the original animation.


# Concept
Take a 12 frame gif that fades from red to blue, where the top right corner of each frame is a solid color and the bottom left corner is white.

![](https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/images/example-start.gif)

We already have 2 spatial dimensions with this image: x and y for pixel coordinates. The third dimension of the data is time.

To encode time as a spartial dimension, imaging creating a cube and drawing the first frame of the animation on the front face of the cube. Now start extruding the pixels of this front face backwards to create a volume. After moving 1/12 of way through the cube, start sampling from the next frame of the animation. Continue this process through the entire cube, leaving a 3D volume of pixel data, 1/12 for each frame of the animation.

Here's what that looks like for the above gif.

![](https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/images/cube.png)

The front left face shows the first frame of the gif.

![](https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/images/cube-front.png)

The right side of the cube shows the rightmost column of pixels for each frame in the animation.

![](https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/images/cube-side.png)

While the top of the cube shows the top row of pixels for each frame in the animation.

![](https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/images/cube-top.png)


## Slicing
These gif cubes are pretty cool, but things get even more interesting if we then project the cube back into two dimensions. To do this, imagine a plane slicing through the cube.

![](https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/images/cube-slice.png)

This shows the slicing plane with smaller part of the cube removed.

Here's the front view of the sliced cube.

![](https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/images/cube-slice-front.png)

Side view.

![](https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/images/cube-slice-side.png)

And top view.

![](https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/images/cube-slice-top.png)


Now, if we sample the gif cube at all points on this plane, we end up with a 2D image that has sampled multiple frames of the original animation.

![](https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/images/cube-slice-image.png)

We can slice the gif cube at any angle like this to create interesting new 

![](https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/images/slice-angled.png)
