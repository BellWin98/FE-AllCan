<template>
    <div class="signup-container">
        <h1>회원가입</h1>
        <form @submit.prevent="handleSubmit" class="signup-form">
            <div class="form-group">
                <label for="email">이메일</label>
                <div class="input-group">
                    <input v-model="email" id="email" required />
                    <button type="button" @click="sendVerificationCode" class="btn">코드 전송</button>
                </div>
            </div>
            <div class="form-group" v-if="codeSent">
                <label for="verificationCode">Verification Code</label>
                <div class="input-group">
                    <input v-model="verificationCode" id="verificationCode" required />
                    <button type="button" @click="verifyCode" class="btn">Verify</button>
                </div>
            </div>
            <div class="form-group">
                <label for="password">비밀번호</label>
                <input type="password" v-model="password" id="password" required />
            </div>
            <div class="form-group">
                <label for="nickname">닉네임</label>
                <div class="input-group">
                    <input v-model="nickname" id="nickname" required />
                    <button type="button" @click="checkNickname" class="btn">중복확인</button>
                </div>
                <p v-if="nicknameTaken" class="error">이미 등록된 닉네임입니다.</p>
            </div>
            <button type="submit" class="btn">가입하기</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            verificationCode: '',
            codeSent: false,
            password: '',
            nickname: '',
            nicknameTaken: false
        };
    },
    methods: {
        sendVerificationCode() {
            // 이메일 인증 코드를 전송하는 로직을 구현합니다.
            this.codeSent = true;
        },
        verifyCode() {
            // 인증 코드를 검증하는 로직을 구현합니다.
        },
        checkNickname() {
            // 닉네임 중복 확인 로직을 구현합니다.
            // 예시: this.nicknameTaken = true; // 닉네임이 이미 존재하는 경우
        },
        handleSubmit() {
            // 회원가입 폼 제출 로직을 구현합니다.
        },
        socialLogin(provider) {
            console.log(provider);
            // 소셜 로그인 로직을 구현합니다.
        }
    }
};
</script>

<style scoped>
.signup-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 2em;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.signup-form .form-group {
    margin-bottom: 1.5em;
}

.signup-form label {
    display: block;
    margin-bottom: 0.5em;
    font-weight: bold;
}

.signup-form input {
    width: 100%;
    padding: 0.75em;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1em;
}

.input-group {
    display: flex;
    justify-content: space-between;
}

.input-group input {
    flex-grow: 1;
    margin-right: 0.5em;
}

.btn {
    padding: 0.75em 1.5em;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: #555;
}

.error {
    color: red;
    font-size: 0.875em;
}
</style>