#include <bits/stdc++.h>
using namespace std;

int main(){
    int t; cin>>t;
    while(t--){
        int n; cin>>n;
        vector<int> nums(n);
        for(int i=0; i<n; i++)
            cin>>nums[i];
        int ans = 0;
        for(int i=0; i<nums.size(); i++){
            string str = to_string(nums[i]);
            char maxx = *max_element(str.begin(), str.end());
            for(int j=0; j<str.size(); j++)
                str[j] = maxx;
            nums[i] = stoi(str);
            ans += nums[i];
        }
        cout<<ans<<endl;
    }
}