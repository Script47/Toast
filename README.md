# Toast
A jQuery plugin to make the usage of Bootstrap 4 toasts easy.

* [About](#about)
* [Usage](#usage)
* [Caveats](#caveats)
* [Roadmap](#roadmap)


### About

As of Bootstrap 4.2, [toasts](https://getbootstrap.com/docs/4.2/components/toasts/) have been inroduced and the aim of this plugin was to make it easier to use them.

### Usage

You can pass to `$.toast` an object with the settings for your toast and the settings are as follows:

| Parameter     |Description| Default | Values |
| ------------- |-----------| -------  |---------
| title         | Shows in the top left corner of the toast | 'Notice!'|        |
| subtitle      | Shows in the top right corner of the toast| N/A      |        |
| content       | Show in the toast body | N/A      |
| type          | Determines the style of the toast based on Bootstrap styles | 'info'   | 'info', 'success', 'warning', 'error'
| delay         | Determines how the toast will show for | 3000

**Note:** If content is omitted, the toast will not have a `.toast-body` and can be used as a small toast which will be shown below in the examples.

```javascript
$.toast({
  title: 'Toast',
  subtitle: '11 mins ago',
  content: 'Hello, world! This is a toast message.',
  type: 'info',
  delay: 5000
});
```

![Example #1](https://i.gyazo.com/20fbdf05b57af4a76e28f66047fe6591.png)

The respective markdown for the above would be:

```
<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="5000">
  <div class="toast-header bg-info text-white">
    <strong class="mr-auto">Toast</strong>
    <small class="text-white">11 mins ago</small>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
      <span aria-hidden="true" class="text-white">&times;</span>
    </button>
  </div>
  <div class="toast-body">Hello, world! This is a toast message.</div>
</div>
```

Now, onto the differnet types:

![Example #2](https://i.gyazo.com/20fbdf05b57af4a76e28f66047fe6591.png)

An 'info' toast

![Example #3](https://i.gyazo.com/51b708cb610e603f61b80a6008a45729.png)

A 'success' toast

![Example #4](https://i.gyazo.com/0844e5f70f1e73416fb38be134144844.png)

A 'warning' toast

![Example #5](https://i.gyazo.com/8ee70ce1203d112a9a30ac53e350d54d.png)

An 'error' toast

The toasts are stackable:

![Example #6](https://i.gyazo.com/da0e40283269c3c38de605b7c938fa95.png)

### Caveats

* The toast will remain in the DOM when hidden, I am working out a way to incorperate removing them from the DOM or reusing existing ones if left in, however, for the time being, you can use the following to remove the toast once it is hidden from the DOM:

```javascript
$(document).on('hidden.bs.toast', '.toast', function (e) {
    $(this).remove();
});
```

### Roadmap

* Allow img in toast as in shown in the Bootstrap 4 documentation
* Allow the option to prevent stacking
* Allow the open to keep / remove from DOM
