def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    prevMap = {}  # val : index

    for i, n in enumerate(nums):
        diff = target - n
        if diff in prevMap:
            return [prevMap[diff], i]
        prevMap[n] = i
    return

# Test
if __name__ == "__main__":
    print(twoSum([2,7,11,15], 9)) # Expected: [0, 1]
    print(twoSum([3,2,4], 6))    # Expected: [1, 2]
