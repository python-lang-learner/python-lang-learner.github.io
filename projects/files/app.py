# app.py
# pip install flask
from flask import Flask, request, redirect, render_template_string

app = Flask(__name__)
notes = []

TEMPLATE = '''
<!doctype html><html><head><meta charset="utf-8"><title>Notes</title></head>
<body>
  <h1>Notes</h1>
  <form method="post" action="/add">
    <input name="text" placeholder="Write a note" required>
    <button type="submit">Add</button>
  </form>
  <ul>
    {% for n in notes %}
      <li>{{ n }}</li>
    {% endfor %}
  </ul>
</body></html>
'''

@app.route('/')
def index():
    return render_template_string(TEMPLATE, notes=notes)

@app.route('/add', methods=['POST'])
def add():
    text = request.form.get('text','').strip()
    if text:
        notes.append(text)
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)
