def binary_search(arr, val, start, end):
    if start == end:
        return start
    if start > end:
        return start
    
    mid = (start + end) // 2
    if arr[mid] == val:
        return mid + 1
    elif arr[mid] > val:
        return binary_search(arr, val, start, mid - 1)
    else:
        return binary_search(arr, val, mid + 1, end)

def binary_insertion_sort(arr):
    for i in range(1, len(arr)):
        val = arr[i]
        # Find the position where val should be inserted
        pos = binary_search(arr, val, 0, i - 1)
        # Move all elements after pos to the right
        arr = arr[:pos] + [val] + arr[pos:i] + arr[i+1:]
    return arr

# Alternative implementation using list.insert and list.pop for efficiency in Python
def binary_insertion_sort_efficient(arr):
    for i in range(1, len(arr)):
        val = arr[i]
        low = 0
        high = i - 1
        while low <= high:
            mid = (low + high) // 2
            if val < arr[mid]:
                high = mid - 1
            else:
                low = mid + 1
        arr.insert(low, arr.pop(i))
    return arr

if __name__ == "__main__":
    test_list = [37, 23, 0, 17, 12, 72, 31, 46, 100, 88, 54]
    print("Original array:", test_list)
    sorted_list = binary_insertion_sort_efficient(test_list.copy())
    print("Sorted array:", sorted_list)
