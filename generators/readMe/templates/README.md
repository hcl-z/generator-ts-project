<h1 align="center">
Welcome to <%= projectName %> 👋
<br>
<a href="https://npm.im/<%= projectName %>">
  <img src="https://badgen.net/npm/v/<%= projectName %>">
</a> 
<a href="https://npm.im/<%= projectName %>">
  <img src="https://badgen.net/github/stars/<%= userName %>/<%= projectName %>">
</a>
<a href="https://npm.im/<%= projectName %>">
  <img src="https://badgen.net/npm/license/<%= projectName %>">
</a>
</h1>

<% if (description) { -%>
><p align="center">
<%= description %>
</p>
<% } -%>


## Install

```sh
npm install
```

## Usage

```sh
npm run dev
```

## Run tests

```sh
npm run test
```
