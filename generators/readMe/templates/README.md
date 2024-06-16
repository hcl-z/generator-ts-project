<h1 align="center">Welcome to <%= projectName %> 👋</h1>
<p>
<a href="https://www.npmjs.com/package/<%= projectName %>" target="_blank">
  <img alt="Version" src="https://img.shields.io/npm/v/<%= projectName %>.svg">
</a>
</p>

<h1 align="center">
Welcome to <%= projectName %> 👋
<br>
<a href="https://npm.im/<%= projectName %>">
  <img src="https://badgen.net/npm/v/<%= projectName %>">
</a> 
<a href="https://npm.im/<%= projectName %>">
  <img src="https://badgen.net/github/stars/<%= projectName %>/<%= projectName %>">
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
