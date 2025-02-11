import { FC, Suspense } from 'react';

const Auth: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="auth-container">
        <h1>认证页面</h1>
        <div className="auth-form">
          <input type="text" placeholder="用户名" />
          <input type="password" placeholder="密码" />
          <button type="submit">登录</button>
        </div>
      </div>
    </Suspense>
  );
};

export default Auth;