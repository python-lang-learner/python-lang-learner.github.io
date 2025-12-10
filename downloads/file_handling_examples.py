#!/usr/bin/env python3
"""
file_handling_examples.py
Small script containing runnable examples for the File Handling lesson.

Usage:
  python downloads/file_handling_examples.py
This script will create a data/ folder and run small demo functions.
"""

from pathlib import Path
import os
import tempfile

ROOT = Path.cwd()
DATA = ROOT / 'data'

def ensure_data():
    DATA.mkdir(exist_ok=True)
    example = DATA / 'example.txt'
    if not example.exists():
        example.write_text("Hello world\nThis is a sample file.\nPython file handling demo.", encoding='utf-8')
    return example

def read_all(path):
    print("=== read_all ===")
    with open(path, 'r', encoding='utf-8') as f:
        print(f.read())

def read_lines(path):
    print("=== read_lines ===")
    with open(path, 'r', encoding='utf-8') as f:
        for i, line in enumerate(f, start=1):
            print(i, line.strip())

def write_demo(path):
    print("=== write_demo ===")
    with open(path, 'w', encoding='utf-8') as f:
        f.write("Line A\nLine B\n")

def append_demo(path):
    print("=== append_demo ===")
    with open(path, 'a', encoding='utf-8') as f:
        f.write("Appended line\n")

def copy_binary(src, dst):
    print("=== copy_binary ===")
    with open(src, 'rb') as s, open(dst, 'wb') as d:
        d.write(s.read())
    print("Copied binary:", dst)

def make_uppercase(src, dst):
    print("=== make_uppercase ===")
    with open(src, 'r', encoding='utf-8') as r, open(dst, 'w', encoding='utf-8') as w:
        for line in r:
            w.write(line.upper())
    print("Wrote uppercase to:", dst)

def delete_file(path):
    if path.exists():
        path.unlink()
        print("Deleted", path)
    else:
        print("No such file:", path)

def temp_demo():
    print("=== temp_demo ===")
    with tempfile.TemporaryDirectory() as tmpdir:
        p = Path(tmpdir) / 't.txt'
        p.write_text('temporary', encoding='utf-8')
        print("Temp path:", p)
        print("Temp contents:", p.read_text(encoding='utf-8'))
    print("Temp dir cleaned up")

def exercises():
    # simple exercise helpers
    def count_words(path):
        text = path.read_text(encoding='utf-8')
        return len(text.split())

    ex = DATA / 'example.txt'
    print("Word count in example.txt:", count_words(ex))

if __name__ == '__main__':
    e = ensure_data()
    read_all(e)
    read_lines(e)
    out = DATA / 'out.txt'
    write_demo(out)
    append_demo(out)
    print("Contents of out.txt:")
    print(out.read_text(encoding='utf-8'))
    uppercase = DATA / 'example_upper.txt'
    make_uppercase(e, uppercase)
    print(uppercase.read_text(encoding='utf-8'))
    temp_demo()
    exercises()
    # cleanup demo file
    delete_file(DATA / 'out.txt')
