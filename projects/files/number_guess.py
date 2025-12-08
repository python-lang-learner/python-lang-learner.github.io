import random

def play():
    print("Welcome to Number Guess!")
    low, high = 1, 100
    secret = random.randint(low, high)
    attempts = 0

    while True:
        try:
            guess = int(input(f"Guess a number between {low} and {high}: "))
        except ValueError:
            print("Please enter a valid integer.")
            continue
        attempts += 1
        if guess == secret:
            print(f"Correct! You took {attempts} attempts.")
            break
        elif guess < secret:
            print("Too low — try again.")
        else:
            print("Too high — try again.")

if __name__ == '__main__':
    play()
