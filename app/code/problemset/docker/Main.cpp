#include <bits/stdc++.h>
using namespace std;

void solve(){
    int n; cin>>n;
    int sum = 0;
    vector<int> arr(n);
    for(int i=0; i<n; i++)
        cin>>arr[i];
    for(int i=0; i<1e6; i++){
        int x = 5;
        string str = to_string(x);
        char maxx = *max_element(str.begin(), str.end());
        for(auto &j:str)
            j = maxx;
        sum += stoi(str);
    }
    cout<<sum<<endl;
}

int main(){
    int t; cin>>t;
    while(t--){
        solve();
    }
    return 0;
}