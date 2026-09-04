def climbStairs(n):
    """
    :type n: int
    :rtype: int
    """
    one, two = 1, 1

    for i in range(n - 1):
        temp = one
        one = one + two
        two = temp

    return one

# Test
if __name__ == "__main__":
    print(climbStairs(2)) # Expected: 2
    print(climbStairs(3)) # Expected: 3
