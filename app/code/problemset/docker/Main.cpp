#include <bits/stdc++.h>
using namespace std;

void solve(){
    int n; cin>>n;
    int sum = 0;
    int arr[1000000000];
    for(int i=0; i<n; i++){
        int x; cin>>x;
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