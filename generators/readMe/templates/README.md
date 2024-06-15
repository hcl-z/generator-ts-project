<h1 align="center">Welcome to <%= projectName %> 👋</h1>
<p>
<a href="https://www.npmjs.com/package/<%= projectName %>" target="_blank">
  <img alt="Version" src="https://img.shields.io/npm/v/<%= projectName %>.svg">
</a>
</p>
<% if (description) { -%>
> <%= description %>
<% } -%>

<% if (repository) { -%>

### 🏠 [Homepage](<%= repository %>)
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
