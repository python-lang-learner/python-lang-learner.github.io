# analyzer.py
# pip install pandas
import pandas as pd
from pathlib import Path

FILE = Path("data.csv")  # replace with your CSV

def summarize(path=FILE):
    df = pd.read_csv(path)
    print("Shape:", df.shape)
    print("\nColumns:\n", df.columns.tolist())
    print("\nHead:\n", df.head().to_string(index=False))
    print("\nDescribe:\n", df.describe(include='all').to_string())

if __name__ == "__main__":
    if not FILE.exists():
        print("Place a data.csv file in the current folder.")
    else:
        summarize()
