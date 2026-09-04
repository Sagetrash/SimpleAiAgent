class Solution:
    def trap(self, height: list[int]) -> int:
        if not height:
            return 0
        
        left, right = 0, len(height) - 1
        left_max, right_max = height[left], height[right]
        water = 0
        
        while left < right:
            if left_max < right_max:
                left += 1
                left_max = max(left_max, height[left])
                water += left_max - height[left]
            else:
                right -= 1
                right_max = max(right_max, height[right])
                water += right_max - height[right]
                
        return water

if __name__ == "__main__":
    sol = Solution()
    test_case = [0,1,0,2,1,0,1,3,2,1,2,1]
    print(f"Input: {test_case}")
    print(f"Output: {sol.trap(test_case)}") # Expected: 6
