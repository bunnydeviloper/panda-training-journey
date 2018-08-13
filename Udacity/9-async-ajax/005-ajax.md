# Lesson 5: Ajax with XHR

### Course Intro
* GET request: an internet request for data. Sent fron a client to a server
* Response: a server's response to a request. Sent from a server to a client. A response to a GET request will usually include data that the client needs to load the page's content
* callback: you call them when you have a response back

### Client Server Demonstration
* think mailman

### Ajax Definition & Examples
* Asynchronous JavaScript And XML request
* Asynchronous means it's non-blocking, you can do other things while waiting for the response
* AJAX response: Data: XML (`<entry></entry>`), JSON(`{prop: data}`), HTML (`<div></div>`)
* XML stores data, HTML presents it on a browser

### APIs
* API: application programming interface
* we use API to interact with various data sources (get/retrive/access data)

### Create an async request with XHR
### The XHR object
* `const asyncRequestObject = new XMLHttpRequest();`
* XMLHttpRequest(XHR or xhr) can be used to request any file type (e.g. plain text, HTML files, JSON files, image files, etc.) or data from an API

### XHR's .open() method
### XHR's .send() method
### A full request
### Project Initial Walkthrough
### Setting a request header
### Project Final Walkthrough
### XHR Recap
### XHR Outro