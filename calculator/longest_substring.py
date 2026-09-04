def lengthOfLongestSubstring(s):
    """
    :type s: str
    :rtype: int
    """
    charSet = set()
    l = 0
    res = 0

    for r in range(len(s)):
        while s[r] in charSet:
            charSet.remove(s[l])
            l += 1
        charSet.add(s[r])
        res = max(res, r - l + 1)
    return res

# Test
if __name__ == "__main__":
    print(lengthOfLongestSubstring("abcabcbb")) # Expected: 3
    print(lengthOfLongestSubstring("bbbbb"))    # Expected: 1
    print(lengthOfLongestSubstring("pwwkew"))   # Expected: 3
