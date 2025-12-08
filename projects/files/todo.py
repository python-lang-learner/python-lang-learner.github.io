from pathlib import Path

FILE = Path("todo.txt")

def load_tasks():
    if not FILE.exists():
        return []
    return [line.strip() for line in FILE.read_text(encoding='utf-8').splitlines() if line.strip()]

def save_tasks(tasks):
    FILE.write_text("\n".join(tasks), encoding='utf-8')

def list_tasks(tasks):
    if not tasks:
        print("No tasks.")
        return
    for i, t in enumerate(tasks, 1):
        print(f"{i}. {t}")

def main():
    tasks = load_tasks()
    while True:
        cmd = input("todo (add/list/done/quit): ").strip().lower()
        if cmd == "add":
            t = input("Task: ").strip()
            if t:
                tasks.append(t)
                save_tasks(tasks)
                print("Added.")
        elif cmd == "list":
            list_tasks(tasks)
        elif cmd == "done":
            list_tasks(tasks)
            n = input("Complete task number: ").strip()
            if n.isdigit():
                idx = int(n) - 1
                if 0 <= idx < len(tasks):
                    tasks.pop(idx)
                    save_tasks(tasks)
                    print("Marked done.")
                else:
                    print("Invalid number.")
        elif cmd in ("quit", "exit"):
            break
        else:
            print("Unknown command.")

if __name__ == '__main__':
    main()
