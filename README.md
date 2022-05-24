# Audio Visualiser Web Component

A simple, light and blazingly fast web component for visualising audio.

[![CDN - jsDelivr][logo]][jsdelivr]

![Showcase Example][showcase]

## How to use?

- Copy the CDN link in your head tag as a module script.

```html
<head>
	<script
		type="module"
		src="https://cdn.jsdelivr.net/gh/Kandreas9/user-avatar@main/dist/user-avatar.js"
	></script>
</head>
```

- You can now use the `<audio-visualiser></audio-visualiser>` tag

```html
<body>
	<audio-visualiser></audio-visualiser>
</body>
```

## Attributes

`audio-type`

- video (default)
- audio

`audio-src` - A link or path to your file. (YTB doesnt work)

`visualiser-color` - Any type of color you want hex or whatever.

`visualiser-bar-count` - The amount of bars the visualiser will have. (default is 50)

`controls-color` - Color for the controls (default is black)

`default-classes` - Set of premade classes with colors and gradients

- neon

## Full Example

```html
<head>
	<script
		type="module"
		src="https://cdn.jsdelivr.net/gh/Kandreas9/user-avatar@main/dist/user-avatar.js"
	></script>
</head>
<body>
	<audio-visualiser
		audio-type="video"
		audio-src="path/to/file"
		controls-color="white"
		default-classes="neon"
	></audio-visualiser>
</body>
```

[logo]: https://img.shields.io/static/v1?label=CDN&message=jsDelivr&color=%23ff5626&logo=jsDelivr&logoColor=%23ff5626
[jsdelivr]: https://cdn.jsdelivr.net/gh/Kandreas9/audio-visualiser@main/dist/audio-visualiser.js
[showcase]: https://raw.githubusercontent.com/Kandreas9/audio-visualiser/main/src/assets/showcase.png
