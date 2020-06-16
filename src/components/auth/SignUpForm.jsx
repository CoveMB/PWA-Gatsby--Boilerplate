import React from 'react';

const SignUpForm = () => {
  return (
    <FormeTitle>Sign Up</FormeTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Div>

          <Label htmlFor="email">Email:</Label>
          <input
            name="email"
            placeholder="Email"
            ref={register({
              required: 'An email is required',
              pattern : {
                value  : emailRegEx,
                message: 'Please register a valid email address',
              },
            })}
          />
          {errors.email && errors.email.message}

          <Label htmlFor="password">Password:</Label>
          <input
            name="password"
            placeholder="Password"
            type="password"
            ref={register({
              required : 'A password is required',
              maxLength: {
                value  : 80,
                message: 'A password should be no more than 80 character long'
              },
              minLength: {
                value  : 8,
                message: 'A password should be at least 8 character long'
              }
            })}
          />
          {errors.password && errors.password.message}

          <Label htmlFor="passwordRepeat">Repeat Password:</Label>
          <input
            name="passwordRepeat"
            ref={register({ required: 'Please confirm your password' })}
          />
          {errors.passwordRepeat && errors.passwordRepeat.message}

          {error && error}

          {isLoading
            ? <Loading />
            : (
              <InputButton />
            )}
        </Div>
      </form>
  )
}

export default SignUpForm