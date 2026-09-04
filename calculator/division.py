def divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "Error: Division by zero is not allowed."

if __name__ == "__main__":
    num1 = float(input("Enter the numerator: "))
    num2 = float(input("Enter the denominator: "))
    result = divide(num1, num2)
    print(f"The result of {num1} divided by {num2} is: {result}")
