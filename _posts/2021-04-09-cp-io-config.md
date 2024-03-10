---
title: "[Algorithms] c++ 표준 입출력 설정"
header:
  teaser: /public/images/cpp-teaser.png
  og_image: /public/images/cpp-teaser.png
category: competitive-programming
tags:
  - Tips
---

> "test case 입출력이 많을 때 I/O 과정에서 병목이 발생하는걸 방지하자."

CP 컨테스트를 하며 보는 다른 참가자의 c++ 솔루션 도입부엔 항상 이런게 있다.

```cpp
ios_base::sync_with_stdio(false);
std::cin.tie(NULL);
```

## 각 라인에서 어떤 일이 일어날까?

```cpp
ios_base::sync_with_stdio(false);
```

**cin 스트림**과 **c언어의 stdio tool들**(scanf, gets 등등)의 I/O 버퍼 동기화를 해제해라.

c/c++ 프로그램은 기본적으로 표준 입출력 버퍼를 공유하며 동기화 작업을 수행하는데(그래서 scanf와 cin을 섞어 사용할 수 있는 것), 이 설정으로 해당 작업을 하지 않게 되는 것이다.
(각자 독립적인 I/O buffer를 가지게 됨)

이 과정에서 없어지는 overhead로 cin의 속도향상 효과를 얻게 된다.

```cpp
std::cin.tie(NULL);
```

cin과 cout을 **untie** 해라.

표준 입출력 buffer는, 기본적으로 cin을 하기 전 flush된다(묶여 있다).  
예를 들어, 아래와 같은 테스트 케이스와 코드가 있다고 하면,

```bash
2
apple
banana
```

```cpp
int t;
string str;

int main() {
  cin >> t;
  while (t--) {
    cin >> str;
    cout << "I like " << str << "\n";
  }
}
```

1. flush
2. cin >> t
3. flush
4. cin >> str
5. flush ("I like apple" 출력)
6. cin >> str
7. flush ("I like banana" 출력)

순서로 수행된다.  
입력의 크기가 커질수록 flush 회수도 linear하게 증가한다.  
**untie** 후에는 어떻게 변하는지 보자.

1. cin >> t
2. cin >> str
3. cin >> str
4. flush ("i like apple\nI like banana" 출력)

마음이 한결 편해졌다. 아래 코드를 템플릿처럼 사용하자.

```cpp
#include <bits/stdc++.h>
using namespace std;
#define FAST_IO ios_base::sync_with_stdio(0),cin.tie(0)

int main() {
  FAST_IO;
  cout << "도움이 되셨으면 좋겠습니다.\n";
}
```
