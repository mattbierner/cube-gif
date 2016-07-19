# About cube.gif

*[cube.gif](site)* is an experiment visualizing gifs as 3D volumes and taking 2D slices of this volume. This encodes animation time as another spatial dimension, that we can then project back into two dimensions to create images that capture multiple frames of the original animation.


# Concept
Take a 12 frame gif that fades from red to blue, where the top right corner of each frame is a solid color and the bottom left corner is white.

![](https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/images/example-start.gif)

We already have 2 spatial dimensions with this image: x and y for pixel coordinates. The third dimension of the data is time.

To encode time as a spatial dimension, imaging creating a cube and drawing the first frame of the animation on the front face of the cube. Now start extruding the pixels of this front face backwards to create a volume. After moving 1/12 of way through the cube, start sampling from the next frame of the animation. Continue this process through the entire cube, leaving a 3D volume of pixel data, 1/12 for each frame of the animation.

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

We can slice the gif cube at any angle like this to create interesting new 3D shapes and 2D slices

![](https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/images/slice-angled.gif)


# Controls

## Camera Movement
Click and drag anywhere outside the cube to rotate the camera about. Use the mouse-wheel to zoom in and out, and hold the right mouse button to pan about.

The buttons in the top left corner of the view allow you to go to one of the standard camera views.

## Guides
![](https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/images/guides.png)

* The gray lines outlines the gif cube volume.
* The black lines shows the the slice plane. The solid gray box shows the location of the top, left side of the slice plane when sampling images.
* The red, green, and blue lines show dimensions of the cube. Red and green map roughly to x and y in single image, while the blue axis maps to time. The axis is positioned in the lower left corner of the image, at frame zero.


## Slicing Plane Movement
The slicing plane can be freely moved about to explore the data. The controls work best on a computer with a mouse.

![](https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/images/slice-translation.gif)

Translation moves the slicing plane. Use the `W` key or the `Translate` button to switch to translation mode. Note that if you move the slice plane off the cube, those areas of the slice are colored in gray and are not included in the output slice image.

![](https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/images/slice-rotation.gif)

Rotation adjusts the angle of the slicing plane. Use the `E` key or the `Rotate` button to switch to rotation mode.

![](https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/images/slice-scale.gif)

Scaling adjusts the size of the sample plane. To understand how scaling works, imagine the slicing plane is a grid ten by ten color sensors, like a camera. Normally, all the sensors in the grid are evenly spaced apart. But when we scale the plane, we adjust the distance between each of these sensors. Scale the plane's width in half, and we still have 10 sensors in each row, but now the distance between all of them is cut in half and we end up being able to detect more detail.

Scaling also interacts with `Sample Width` and `Sample Height`. Scale determines the size of the image sensor plane, while `Sample Width` and `Sample Height` determine the number of columns and rows of sensors respectively on this plane. This offers a lot of control over the output image, but can also be confusing. To avoid distortion, make sure that the aspect ratio of the plane matches the aspect ratio of the sampling.


## Sample Size
`Sample Width` and `Sample Height` control the size of the output slice image. As discussed above in scaling, you can think of these as the number of points (pixels) sampled on the slicing plane.

Decreasing the number of samples lowers the resolution of the output image.

![](https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/images/low-res-slice.png)

While increasing the number of samples increases the resolution.

![](https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/images/high-res-slice.png)

You can also adjust the width and height separately to get different aspect ratio output images.


![](https://raw.githubusercontent.com/mattbierner/cube-gif/gh-pages/documentation/images/wide-res-slice.png)




