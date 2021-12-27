---
title: "[Git] 명령어 Cheat Sheet (cumulative)"
header:
  overlay_image: /public/images/git.jpeg
categories:
  - Git
---

> 까먹을 때마다 와서 보고, 숙지하자.

## 🐣 git clone

```bash
$ git clone {repoUrl}
```
로컬의 현재 위치에 git repository의 복사본을 만들고 싶어.  
repoUrl이 "<span class="bolster">https://</span>"로 시작하면 https 프로토콜로,  
"<span class="bolster">git@</span>"으로 시작하면 ssh 프로토콜로 origin에 붙게 됨.

<br/>


## 🐣 git pull

```bash
$ git pull
```
로컬의 이 브랜치가 origin에도 있을거야.  
그 브랜치의 변경사항을 로컬에 반영해줘.

```bash
$ git pull {nameOfSourceBranch}
```
source branch의 변경사항을 현재 브랜치에 반영해줘.  
소스 브랜치는 로컬이든, origin의 브랜치든 상관이 없다.


<br/>


## 🐣 git branch

```bash
$ git branch [-r]
```
로컬의 브랜치 목록 보여줘.  
"<span class="bolster">-r</span>"을 붙이면 origin의 브랜치 목록을 보여줌.

```bash
$ git branch {nameOfNewBranch}
```
로컬에 새 브랜치 생성해줘.(로컬의 변경사항과 git index를 그대로 가지고)

```bash
$ git branch -d {nameOfLocalBranch}
```
로컬 브랜치 지워줘.  
ex]
<img src="/public/images/git-delete-branch-example.png"/>

<br/>


## 🐣 git checkout

```bash
$ git checkout {nameOfTargetBranch}
```
이 브랜치로 이동해줘.  
ex]
<img src="/public/images/git-checkout-example.png"/>

```bash
$ git checkout -b {nameOfNewBranch}
```
이 브랜치 생성하고, 거기로 이동해줘.  
ex]
<img src="/public/images/git-checkout-example-2.png"/>

```bash
$ git checkout .
```
로컬의 index에 추가되지 않은 변경사항 다 지우고싶어.

<br/>


## 🐣 git status

```bash
$ git status
```
내가 지금까지 뭘 작업했더라?  
ex]
<img src="/public/images/git-status-example.png"/>

<br/>


## 🐣 git add

```bash
$ git add {filePath}
```
filePath로 지정한 파일을 git index에 추가해줘. 커밋할지도 몰라.  
ex]
<img src="/public/images/git-add-example.png"/>

```bash
$ git add .
```
지금까지 내가 만진 파일들, 다 git index에 추가해줘. 커밋할지도 몰라.  
ex]
<img src="/public/images/git-add-example-2.png"/>

<br/>


## 🐣 git push

```bash
$ git push
```
이 브랜치랑 연결된 origin 브랜치에, 커밋한 변경사항들 반영해줘.  
ex]
<img src="/public/images/git-push-example.png"/>

```bash
$ git push --set-upstream origin {nameOfNewOriginBranch}
```
로컬의 이 브랜치를 origin에도 생성해줘. 거기에 push 할거야  
ex]
<img src="/public/images/git-set-upstream-example.png"/>

```bash
$ git push --delete origin {nameOfOriginBranch}
```
원격 브랜치 지워줘.  
ex]
<img src="/public/images/git-delete-origin-branch-example.png"/>

<br/>


## 🐣 git commit

```bash
$ git commit -m "{commitMessage}"
```
git index에 추가된 내용들 커밋하고, 이 메세지로 기록해줘.  
ex]
<img src="/public/images/git-commit-example.png"/>

```bash
$ git commit --amend
```
commit 메시지 수정하고싶어.  

<br/>


## 🐣 git stash

```bash
$ git stash
```
커밋되지 않은 내용들(로컬의 변경사항, index에 add된 내용들) 잠시 stack에 보관해줘.

```bash
$ git stash pop
```
커밋되지 않은 내용들(로컬의 변경사항, index에 add된 내용들) 이 브랜치에 꺼내줘.

```bash
$ git stash clear
```
stash 스택을 비워줘.

