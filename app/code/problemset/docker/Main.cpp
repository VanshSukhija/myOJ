#include <bits/stdc++.h>
using namespace std;

int main(){
    int t; cin>>t;
    while(t--){
        int ans = 0;
        int n; cin>>n;
        for(int i=0; i<n; i++){
            int x; cin>>x;
            string str = to_string(x);
            char maxx = *max_element(str.begin(), str.end());
            for(int j=0; j<str.size(); j++)
                str[j] = maxx;
            x = stoi(str);
            ans += x;
        }
        cout<<ans<<endl;
    }
}