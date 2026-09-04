def binary_search(arr, val, start, end):
    """
    Finds the position where 'val' should be inserted in the sorted array 'arr'
    between 'start' and 'end'.
    """
    if start == end:
        return start
    
    mid = (start + end) // 2
    if arr[mid] < val:
        return binary_search(arr, val, mid + 1, end)
    else:
        return binary_search(arr, val, start, mid)

def binary_insertion_sort(arr):
    """
    Sorts the array using Binary Insertion Sort.
    """
    for i in range(1, len(arr)):
        val = arr[i]
        # Find the position to insert the current element
        pos = binary_search(arr, val, 0, i)
        
        # Shift elements to the right to make space for the new element
        arr = arr[:pos] + [val] + arr[pos:i] + arr[i+1:]
        # Note: In a real in-place implementation, we'd use a loop or slice assignment.
        # To keep it simple and clear for a python file:
    return arr

# Correcting the binary_insertion_sort to be more efficient/standard in Python
def binary_insertion_sort_inplace(arr):
    for i in range(1, len(arr)):
        val = arr[i]
        pos = binary_search(arr, val, 0, i)
        
        # Shift elements to the right
        # arr[pos+1 : i+1] = arr[pos : i]
        # Using a while loop for clarity on how it works internally
        j = i - 1
        while j >= pos:
            arr[j + 1] = arr[j]
            j -= 1
        arr[pos] = val
    return arr

if __name__ == "__main__":
    test_arr = [37, 23, 0, 17, 12, 72, 31, 46, 100, 88, 54]
    print(f"Original array: {test_arr}")
    sorted_arr = binary_insertion_sort_inplace(test_arr[:])
    print(f"Sorted array:   {sorted_arr}")
