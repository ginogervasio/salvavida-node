salva-vida-node
===============

- Make sure you have a local mongo instance running
- Install all node packages with `npm install`
- Run the app with `node app.js`

Here are some tests:
- `curl -X POST -H 'Content-Type: application/json' -d '{"lat":1, "lng":1, "name":"ulf"}' http://localhost:3000/sos`

- `curl -X POST -H 'Content-Type: application/json' -d '{"id":"5287ce35d1e7ce0000000001"}' http://localhost:3000/rescue`

- `curl -X GET -H 'Content-Type: application/json' http://localhost:3000/feed?state=open`

License
-------

The MIT License (MIT)

Copyright (c) 2013 Ulf Schwekendiek

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
