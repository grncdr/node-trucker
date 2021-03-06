[![Build Status](https://travis-ci.org/davidmfoley/node-trucker.svg?branch=master)](https://travis-ci.org/davidmfoley/node-trucker)
#trucker

Trucker is a command-line tool that helps manage "require" dependencies between files that conform to CommonJS (for example: node.js or browserify source files).

It has two main functions:

1. Show all inbound and outbound dependencies for javascript and coffeescript source files that use require to manage those dependencies. (```--info``` or ```-i```)

1. Move/rename source files while fixing up the paths used in requires. (```--move``` or ```-m```)

Why is it called trucker? Becuase it hauls your files around without breaking them.

#Installation

```npm install -g trucker```

(trucker requires node.js and npm)

#Usage

To move files:

```trucker  --move [flags] source [additional sources...] destination```

To get info about files:

```trucker --info [optional file paths]```

If no paths are passed, trucker will spit out information for all files in the `base` path (see options below).

##Examples

in the examples directory (provided), you can try the following (add ```-n``` for dry run mode if desired):

- Get info about all dependencies in the current directory and all sub directories
```trucker --info```

- Get dependencies for just one subdirectory
```trucker -i stark/```

- Move a single file:
```trucker --move stark/eddard.js deceased/```

- Move a single file, specifying destination path:
```trucker -m stark/eddard.js deceased/ned.js```

- Move multiple files explicitly
```trucker -m stark/eddard.js tully/catelyn.js deceased/```

- Move a directory:
```trucker -m stark deceased/stark```

- Paths are automatically created:
```trucker -m stark/eddard.js deceased/in/book1/```

##Options
```-h, --help``` prints the help

```-n, --dry-run``` tells trucker not to move any files, but to instead print out a list of all of the changes that would have been made if this option was not set.

```-s, --scope``` can be used to expand or contract the set of files that trucker searches for dependencies. This defaults to the present working directory. If you have a very large project you may wish to constrain the scope for performance reasons (analysis takes time), or in some cases you may wish to expand the scope beyond the current directory. Use ```--scope``` for this.

```-q, --quiet``` suppress output

# Supported file types

Trucker supports javascript and coffeescript source files. It can handle projects that have both of these file types intermixed.

# Limitations

## Tested on OSX

Should also work on other platforms. Let me know if you have a problem.

## require syntax

Trucker only recognizes basic require syntax.

Trucker doesn't recognize this, for example:
```javascript
var x = '../foo/bar';
var y = require(x);
```

