---
title: "[Git] 명령어 Cheat Sheet (cumulative)"
header:
  teaser: /public/images/git-teaser.png
  og_image: /public/images/git-teaser.png
category: web
tags:
  - DevOps
last_modified_at: 2024-03-10T19:51:00+09:00
---

Git 잘쓰는 동료가 좋아요.

## 여기서 사용하는 용어

- 메인 저장소: github origin에 있는 원본 repo. 오픈소스의 경우 수많은 contributor에 의해 수정이 발생하고, 이를 **upstream**이라고 부름
- 나의 저장소: 내 github 환경에 있는 repo. 오픈소스를 fork 했거나, 내가 직접 생성한 repo. 이를 **origin**이라고 부름
- 로컬 저장소: 내 로컬에 있는 repo
- staged 상태: git index에 추가(git add)된 상태

## git init

```bash
$ mkdir ${my-repo-name}
$ cd ${my-repo-name}
$ git init
```

현재 디렉토리를 git repository로 초기화 해준다.

## git remote add

```bash
$ git remote add origin ${로컬-저장소와-연결할-github-repo-주소.git}
```

로컬의 저장소와 원격 저장소를 연결해준다.

```bash
$ git remote add upstream ${로컬-저장소와-연결할-메인-저장소의-주소.git}
```

origin이 fork해온 repo일 경우 메인 저장소가 있기 마련이다. 메인 저장소를 upstream으로 추가해준다.

## git fetch

```bash
$ git fetch upstream
```

upstream에는 수시로 수많은 contributor에 의해 수정이 일어난다.  
새로생긴 브랜치, 메인브렌치의 새로운 커밋들을 로컬에 동기화 하고 싶을 때 수행.

## git merge

```bash
$ git merge upstream/master
```

updatream의 소스코드 변경사항을 로컬의 현재 브랜치에 merge 시킨다.

## git clone

```bash
$ git clone ${origin-repo-url.git}
```

github 상에 존재하는 repo의 복사본을 현재 디렉토리에 내려받는다.  
url이 `https://`로 시작하면 https 프로토콜로, `git@`으로 시작하면 ssh 프로토콜로 origin에 붙게 됨.

## git pull

```bash
$ git pull
```

`origin`의 변경사항을 `로컬 저장소`에 동기화 해준다. (by default)

```bash
$ git pull ${name-of-source-branch}
```

source branch의 변경사항을 현재 브랜치에 반영해준다.

## git branch

```bash
$ git branch [-r]
```

로컬의 브랜치 목록을 보여준다. `-r`을 인자로 주면 origin의 브랜치 목록을 보여줌.

```bash
$ git branch --list
```

로컬의 브랜치 목록을 보여준다.

```bash
$ git branch ${name-of-new-branch}
```

로컬의 변경사항과 git index를 유지한채로(그대로 가지고) 새 브랜치를 생성해준다.

```bash
$ git branch -d ${name-of-target-branch}
```

로컬 브랜치를 지워준다.

## git checkout

```bash
$ git checkout ${name-of-target-branch}
```

타켓 브랜치로 이동한다.

```bash
$ git checkout -b ${name-of-target-branch}
```

브랜치를 생성하고, 거기로 이동한다.

```bash
$ git checkout .
```

로컬의 index에 추가되지 않은 변경사항을 다 날려준다.

## git status

```bash
$ git status
```

현재 버전의 상태를 파일이름 단위로 요약해서 보여준다.

- 단순히 저장만 누른 로컬의 변경사항
- 새로 만든 파일
- 지운 파일
- 인덱스에 추가된 변경사항 (`git add`)
- 커밋한 변경사항 (`git commit`)
- ...

## git log

```bash
$ git log --oneline
```

커밋이력을 커밋해시와 함께 line by line으로 보여준다.

## git add

```bash
$ git add ${file-path}
```

파일을 git index에 추가해준다.

```bash
$ git add .
```

현재 디렉토리(이하)의 변경사항을 모두 git index에 추가해준다.

```bash
$ git add -p
```

현재 디렉토리(이하)의 변경사항을 모두 chunk 단위로 command line에서 보면서 반영 할지 안할지 결정하게 해준다. `-p`는 patch의 약자에요.

## git push

```bash
$ git push
```

이 브랜치랑 연결된 `origin`의 브랜치에 로컬의 커밋들을 반영해준다.

```bash
$ git push --set-upstream origin ${name-of-new-origin-branch}
```

로컬의 이 브랜치를 `origin`에 없다면 생성하고, 그 브랜치로 연결해준다.

```bash
$ git push --delete origin ${name-of-target-origin-branch}
```

원격의 브랜치 지워준다.

## git commit

```bash
$ git commit -m "${commit-message}"
```

git index에 추가된 내용들 커밋하고, commit message를 기록해준다.

```bash
$ git commit --amend
```

가장 최근 일어난 commit을 덮어써준다. 현재 git index에 추가되어있는 변경사항이 최근 commit에 추가되며, commit message를 변경할 수 있도록 설정된 text editor가 열린다.

## git stash

```bash
$ git stash
```

커밋되지 않은 내용들(로컬의 변경사항, index에 add된 내용들)을 잠시 `stash stack`에 보관해준다.  
stack에 `push`된 변경사항들을 다른 브랜치에서 `pop`할 수도 있으며, 대상 브랜치의 변경사항과 충돌이 발생할 수 있다.

```bash
$ git stash pop
```

가장 나중에 `stash`가 일어난 변경사항을 이 브랜치에 반영해준다.

```bash
$ git stash clear
```

`stash stack`을 비워준다.

## git restore

```bash
$ git restore ${file-name}
```

git index에 추가되지 않은 로컬의 변경사항을 가장 최근 커밋의 버전으로 되돌린다.

```bash
$ git restore --staged ${file-name}
```

git index에 추가된 로컬의 변경사항을 `unstaged` 상태로 바꿔준다.
