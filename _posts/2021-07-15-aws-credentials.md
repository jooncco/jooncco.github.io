---
title: "[AWS] 로컬에 aws cli profile 설정하기"
header:
  overlay_image: /public/images/aws-post-header.png
categories:
  - AWS
last_modified_at: 2021-07-15T17:58:00+09:00
---

> AWS Command Line Interface

\: aws web에 접속하지 않고 커맨드라인 상에서 aws에서 제공하는 서비스를 쓸 수 있게 해주는 툴.

<br/>

팀에서 진행중인 toy project에서 DynamoDB와 aws lambda를 쓸일이 생겨  
로컬에 aws cli와 sam cli를 세팅하다가,  

문득 로컬의 aws credential을 profile별로 관리하고  
손쉽게 스위칭 하는 방법이 알고 싶어져 포스팅을 하게 되었다.  

<br/><br/>

## 📒 AWS CLI 설치

[공식 링크](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)로 가서 운영체제에 맞게 설치하면 된다.

나의 경우 pkg 파일을 다운받아 설치했다.


<br/><br/><br/>

## 🤔 profile? 왜 설정할까.

AWS의 모든 서비스는 권한체크 후에 이루어진다.  
웹 콘솔에 접속했을 때는 이미 세션/토큰에 있는 key값에 의해 해당 서비스에 authorized 된 사용자인지가 식별이 가능하지만,  
AWS CLI를 통해 로컬에서 터미널로 서비스 API를 호출할 경우, 계정에 부여된 access key를 로컬에 설정 해야만  
내가(내 로컬의 AWS CLI 클라이언트가) 이 서비스에 권한이 있다는 사실을 AWS 서버에서 알 수가 있기 때문이다.

<br/><br/><br/>


## ⚙️ How to

aws cli 설치 확인.  
```bash
aws --version
```
<img src="/public/images/aws-credentials-figure-1.png"/>

<br/><br/><br/>

aws web에서 IAM 계정 Key정보 확인.  
<img src="/public/images/aws-credentials-figure-2.png"/>

<br/><br/><br/>

다시 Terminal로 돌아와서 다음 명령어를 수행하면,  
Key 정보를 요구하는 user prompt가 차례로 뜬다.  
```bash
aws configure
```
<img src="/public/images/aws-credentials-figure-3.png"/>

<br/><br/><br/>

설정 후에 <span class="bolster">~/.aws</span> 디렉토리를 확인해보면  
credentials와 config 파일이 생성된것을 볼 수 있다!  

<img src="/public/images/aws-credentials-figure-4.png"/>

<br/><br/><br/>

이어서 두번째 프로파일을 생성.  
프로파일 이름을 지정할때는 <span class="bolster">--profile</span> 옵션을 주면 된다.
```bash
aws configure --profile ${nameOfProfile}
```
<img src="/public/images/aws-credentials-figure-5.png"/>

<br/><br/><br/>

설정 후에 <span class="bolster">~/.aws</span> credentials 파일을 다시 확인해보면  
두 번째 프로파일이 생성된것을 볼 수 있다!  

<img src="/public/images/aws-credentials-figure-6.png"/>

<br/><br/><br/>

남은건 profile 스위칭.  
```bash
# AWS_DEFAULT_PROFILE라는 이름의 환경변수에 "secondProfile"을 지정.
export AWS_DEFAULT_PROFILE=secondProfile
```

<br/><br/>

Terminal의 세션이 닫혀도 AWS_DEFAULT_PROFILE 환경변수가 유지되기를 원한다면:  
```bash
# zsh
echo "export AWS_DEFAULT_PROFILE=secondProfile" >> ~/.zshrc
```
```bash
# bash
echo "export AWS_DEFAULT_PROFILE=secondProfile" >> ~/.bashrc
```
<img src="/public/images/aws-credentials-figure-7.png"/>

<br/><br/><br/><br/><br/>

<b>📎 Ref.</b>  
[AWS Configure 여러 계정으로 스위칭하며 사용하기](https://novemberde.github.io/aws/2018/06/20/AWS-config-switching.html)
