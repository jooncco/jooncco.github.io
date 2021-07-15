---
title: "[AWS] 로컬에 aws cli profile 설정하기"
header:
  overlay_image: /assets/images/default-header.png
categories:
  - AWS
last_modified_at: 2021-07-15T17:58:00+09:00
---

> AWS CLI

\: aws web에 접속하지 않고 커맨드라인 상에서 <span class="bolster">aws</span> 라는 명령어로 aws에서 제공하는 서비스를 쓸 수 있게 해주는 툴.

<br/>

얼마전 팀장님이 사주신 2021년형 맥북프로(CTO✨)가 주는 만족도가 장난 아니다.  
생산성이 어디까지 올라갈까🏌🏼  

팀에서 진행중인 토이 프로젝트에서 DynamoDB와 aws lambda를 쓸일이 생겨 로컬에 aws cli와 sam cli를 세팅하다가,  

문득 로컬의 aws credential을 깔끔하게 관리하는 방법이 알고 싶어져 포스팅을 하게 되었다.  

<br/><br/>

## 📒 AWS CLI 설치

[공식 링크](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)로 가서 운영체제에 맞게 설치하면 된다.

나의 경우 pkg 파일을 다운받아 설치했다.


<br/><br/><br/>

## 🤔 profile? 왜 굳이.

profile별로 aws credential을 관리하면, 분명한 이점이 있다.  
CI/CD 파이프라인이 없는 소규모의 프로젝트의 경우에는 상관 없지만  
나름의 틀(?)을 갖춘 프로젝트의 경우, 대부분 팀에서 제공받은 개발용/배포용 aws IAM credential을 사용하게 되는데  
로컬에서 개발중인 프로젝트가 여러개라면 credential이 꼬일 수 있기 때문이다.  

코린이 시절(지금도 코른이는 아니지만)  
내가 언제 생성해놓은지도 모르는 로컬의 aws credential을 자꾸  
참여중인 프로젝트의 배포 스크립트가 읽어가서 에러가 나는건데  
그날 작성한 코드에서 컴파일 에러가 발생한 줄 알고 한참을 헤맨 기억이 있다.  

이런 상황에 로컬의 환경변수 AWS_PROFILE 값을 바꿔가며 유용하게 사용할 수 있다.  

지금 생각해보면, 두번째 참여했던 프로젝트도 aws 인프라에 CI/CD가 구축되어 있었는데  
프로젝트 빌드/배포 스크립트에 <span class="bolster"> export AWS_PROFILE={배포용프로파일이름} </span>가 포함되어 있지 않았을까 싶다.  


<br/><br/><br/>


## ⚙️ How to

aws cli 설치 확인.  
```bash
aws --version
```
<img src="/assets/images/aws-credentials-figure-1.png"/>

<br/><br/><br/>

aws web에서 IAM 계정 Key정보 확인.  
<img src="/assets/images/aws-credentials-figure-2.png"/>

<br/><br/><br/>

다시 Terminal로 돌아와서 다음 명령어 수행를 수행하면,  
Key 정보를 요구하는 user prompt가 차례로 뜬다.
```bash
aws configure
```
<img src="/assets/images/aws-credentials-figure-3.png"/>

<br/><br/><br/>

설정 후에 <span class="bolster">~/.aws</span> 디렉토리를 확인해보면  
credentials와 config 파일이 생성된것을 볼 수 있다!  

<img src="/assets/images/aws-credentials-figure-4.png"/>

<br/><br/><br/>

이어서 두번째 프로파일을 생성.  
프로파일 이름을 지정할때는 <span class="bolster">--profile</span> 옵션을 주면 된다.
```bash
aws configure --profile {nameOfProfile}
```
<img src="/assets/images/aws-credentials-figure-5.png"/>

<br/><br/><br/>

설정 후에 <span class="bolster">~/.aws</span> credentials 파일을 다시 확인해보면  
두 번째 프로파일이 생성된것을 볼 수 있다!  

<img src="/assets/images/aws-credentials-figure-6.png"/>

<br/><br/><br/>

남은건 profile을 스위칭하기.  
```bash
# 환경변수로 default profile을 등록.
export AWS_DEFAULT_PROFILE=secondProfile

# Terminal 세션이 닫혀도 유지되기를 원한다면,
echo "export AWS_DEFAULT_PROFILE=secondProfile" >> ~/.zshrc
# echo "export AWS_DEFAULT_PROFILE=secondProfile >> ~/.bashrc"
```
<img src="/assets/images/aws-credentials-figure-7.png"/>

<br/><br/>

프로젝트에서 <span class="bolster">AWS_DEFAULT_PROFILE</span>라는 환경변수를 배포에 사용하고 있다면,  
개발을 시작하기 전에 배포 스크립트를 실행할 터미널에서
```bash
export AWS_DEFAULT_PROFILE={nameOfProfile}
```
을 실행해두고 작업하는 것이 좋은 습관이라는 생각이 든다.

Terminal이 뜨면서 자동으로 실행되는 .zshrc의 스크립트들은  
터미널의 초기 상태를 만들어버리는 꼴이기 때문에 지양하는 것이 좋기 때문이다.  

<br/><br/><br/><br/><br/>

<b>📎 Ref.</b>  
[AWS Configure 여러 계정으로 스위칭하며 사용하기](https://novemberde.github.io/aws/2018/06/20/AWS-config-switching.html)