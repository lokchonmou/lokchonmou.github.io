import numpy as np
from scipy.integrate import solve_ivp
import matplotlib.pyplot as plt

# Data of the problem.
g = 9.81  # gravitational acceleration
l = 12  # length of the pendulum (distance of the center of gravity from the suspension pivot)

# The second order equation of motion (ODE) was converted to first order form.
# This is the right hand side function. y[0] = angle, y[1] = angular velocity.
def f(t, y):
    return [y[1], -g/l*np.sin(y[0])]

thetadot0 = [-24/np.cos(np.pi/4)/12]  # initial angular velocity

for td0 in thetadot0:
    Theta0 = [np.pi/4, td0]  # initial condition: hanging down, with nonzero initial velocity

    # Solve the ODE
    sol = solve_ivp(f, [0, 2], Theta0, method='RK45', t_eval=np.linspace(0, 2, 1000))

    # Plot the solution
    plt.figure()
    plt.plot(sol.t, sol.y[0, :], linewidth=2, color='red', marker='none', label='angle')
    plt.plot(sol.t, sol.y[1, :], linewidth=2, color='blue', marker='none', label='angular velocity')
    plt.xlabel('Time')
    plt.ylabel('Solution')
    plt.title('Initial angular velocity = {}'.format(td0))
    plt.grid(True)
    plt.legend()
    plt.show()
