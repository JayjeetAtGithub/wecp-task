#include <iostream>
using namespace std;

int main() {
    int n, *arr, sum = 0;
    cin >> n;
    arr = new int[n];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    for (int i = 0; i < n; i++) {
        sum += arr[i];
    }
    cout << sum << "\n";
}
