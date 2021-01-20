# Toast - A Bootstrap 5.0 jQuery plugin

-   [About](#about)
-   [Updates](#updates)
-   [Usage](#usage)
    -   [Live Example](https://romantic-wozniak-01d0b4.netlify.app/)
-   [Contributing](#contributing)
    -   [Contributors](#contributors)

## About

As of **Bootstrap 4.2**, [toasts](https://getbootstrap.com/docs/4.2/components/toasts/) have been introduced and the aim of this plugin is to make them easier to use. (original)

## Updates

## Usage

### Global Variables (or default values)

Modify the global variables to apply specific rules/styles to all your toasts.

```js
// default option values
$.toastDefaults = {
    position: "top-right",
    dismissible: true,
    stackable: true, // stackable & pauseDelayOnHover options are incompatible
    pauseDelayOnHover: false,
    style: {
        // user custom style classname
        toast: "",
        info: "",
        success: "",
        warning: "",
        error: "",
        primary: "",
        secondary: "",
        light: "",
        dark: "",
    },
};
```

### Initializing Global Variables

```js
// plugin initializing function
$.toastInit = function (opts) {
    const { position, dismissible, stackable, pauseDelayOnHover } = opts;

    // set values (using ES6 nullish coalescing)
    $.toastDefaults.position = position ?? $.toastDefaults.position;
    $.toastDefaults.dismissible = dismissible ?? $.toastDefaults.dismissible;
    $.toastDefaults.stackable = stackable ?? $.toastDefaults.stackable;
    $.toastDefaults.pauseDelayOnHover = pauseDelayOnHover ?? $.toastDefaults.pauseDelayOnHover;
};
```

```js
// initializing example in sample.html
$.toastInit({
    position: "bottom-center",
    dismissible: true,
    stackable: true, // stackable & pauseDelayOnHover options are incompatible
    pauseDelayOnHover: false,
});
```

#### Snack

A "snack" is a bitesized "toast".

```javascript
$.snack(type, title, delay);
```

<img src="https://i.gyazo.com/165671094c4c956bf89a05f4d9f089b1.png">

**Note:** The final argument `delay` is omitable. If omitted, the toast will remain forever.

#### Toast

```javascript
$.toast({
    type: "info",
    title: "Notice!",
    subtitle: "11 mins ago",
    content: "Hello, world! This is a toast message.",
    delay: 5000,
    img: {
        src: "https://via.placeholder.com/20",
        class: "rounded-0" /**  Classes you want to apply separated my a space to modify the image **/,
        alt: "Image",
    },
});
```

<img src="https://i.gyazo.com/63c444e180d5d18ef8a71df2969cc0cc.png">

### Contributing

Feel free to contribute in any of the ways outlined:

-   Submit issues/pull requests
-   Tell us how you're using this plugin in _your_ project
