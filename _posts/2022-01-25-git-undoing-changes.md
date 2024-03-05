---
title: "[Git] 변경사항 취소하기"
header:
  teaser: /public/images/git-teaser.png
  og_image: /public/images/git-teaser.png
category: web
tags:
  - DevOps
toc: true
toc_sticky: true
---

우리를 구해줄 명령어들.

<br />

#### 로컬에서 단순히 저장했던 파일들 원복하기

```zsh
$ git checkout .
```
```zsh
$ git restore .
```
현재 디렉토리 하위의 staging 되지 않은 모든 수정사항을 원복해준다.  
추적하지 않는 파일에는 영향이 없다.

<br />

#### git add 취소하기

```zsh
$ git restore --staged {file-name}
```
```zsh
$ git reset HEAD {file-name}
```
인자로 전달한 file들을 `unstaged` 상태로 바꿔줌.

<br />

#### 최근 commit 수정하기

```zsh
$ git commit --amend
```
새로 staging한 변경사항을 최근 커밋에 함께 묻고, 커밋메세지도 바꿀 수 있게 해준다.  
깔끔한 commit history를 위해 상당히 자주 사용하는 명령어.  
**oigin**의 공유 branch에 반영이 되어야 한다면 강제(`git push -f`) 필수.

<br />

#### git commit 취소하기

```zsh
$ git reset --soft HEAD^
```
최근 커밋을 취소하고, 커밋했던 변경사항들은 `staged 상태`로 남겨준다.

```zsh
$ git reset HEAD^
```
```zsh
$ git reset HEAD~2  // 최근 커밋 2개 취소
```
```zsh
$ git reset --mixed HEAD^
```
최근 커밋을 취소하고, 커밋했던 변경사항들을 `unstaged 상태`로 남겨준다.  
로컬의 변경사항과 섞이게 됨.

```zsh
$ git reset --hard HEAD^
```
최근 커밋을 취소하고, 커밋했던 변경사항들을 다 날린다.

<br />

#### git push 취소하기

`remote 브랜치의 commit을 취소하고싶어`가 더 정확한 표현.

```zsh
$ git revert HEAD
```
최근 커밋을 되돌리는 **새로운 커밋**을 추가해줌.

```zsh
$ git log --oneline
872fa7e Try something crazy <- 되돌리고 싶은 커밋
a1e8fb5 Make some important changes to hello.txt
435b61d Create hello.txt
9773e52 Initial import
```
remote 브랜치의 히스토리가 위와 같은 상황에서 commit `872fa7e`을 되돌리고 싶은 상황.  

```zsh
$ git log --oneline
e2f9a78 Revert "Try something crazy"
872fa7e Try something crazy
a1e8fb5 Make some important changes to hello.txt
435b61d Create hello.txt
9773e52 Initial import
```
이때 revert 명령어를 사용하면 위와 같이 새로운 커밋이 생기게 됨.

> 🧨 **git reset**을 사용하면 안되는 이유  

git reset 명령어는 git 히스토리에서 커밋이 **완전히 없었던 일처럼** 지워진다.  
remote의 공동 작업브랜치에 있는 커밋을 이런 식으로 지울 경우, 그 commit 기준으로 작업하던 동료들을 매우 귀찮게 하는 일이 될 수 있다.  

따라서 `git reset`은 **로컬의 브랜치**에서 커밋을 깔끔하게 지우고 싶을 때에만 사용하고,
remote의 공동 작업브랜치의 커밋을 취소할 때는 `git revert`가 권장된다.

