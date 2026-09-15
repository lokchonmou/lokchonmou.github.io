
"""
ode_integrators.py
------------------
Lightweight fixed-step ODE integrators (Euler, RK2-midpoint, RK4-classical).

Usage:
    from ode_integrators import integrate

    def f(t, y):  # y: ndarray shape (d,)
        return ...

    ts, ys = integrate(f, t0=0.0, y0=np.array([...], dtype=float),
                       t1=10.0, h=0.01, method="rk4")

Methods:
    - "euler"  : explicit Euler
    - "rk2"    : midpoint RK2
    - "rk4"    : classical 4th-order Runge–Kutta

Notes:
    - Fixed step size h; returns uniform ts from t0 to t1 (inclusive if divisible).
    - y0 can be Python list or numpy array; will be promoted to np.ndarray.
    - f must return a 1‑D numpy array broadcast‑compatible with y.
"""
from __future__ import annotations
import numpy as np
from typing import Callable, Tuple

Array = np.ndarray

def _step_euler(f: Callable[[float, Array], Array], t: float, y: Array, h: float) -> Array:
    return y + h * f(t, y)

def _step_rk2_midpoint(f: Callable[[float, Array], Array], t: float, y: Array, h: float) -> Array:
    k1 = f(t, y)
    k2 = f(t + 0.5*h, y + 0.5*h*k1)
    return y + h * k2

def _step_rk4(f: Callable[[float, Array], Array], t: float, y: Array, h: float) -> Array:
    k1 = f(t, y)
    k2 = f(t + 0.5*h, y + 0.5*h*k1)
    k3 = f(t + 0.5*h, y + 0.5*h*k2)
    k4 = f(t + h,       y + h*k3)
    return y + (h/6.0) * (k1 + 2*k2 + 2*k3 + k4)

_STEPPERS = {
    "euler": _step_euler,
    "rk2":   _step_rk2_midpoint,
    "rk4":   _step_rk4,
}

def integrate(f: Callable[[float, Array], Array],
              t0: float,
              y0: Array,
              t1: float,
              h: float,
              method: str = "rk4") -> Tuple[Array, Array]:
    """
    Fixed-step integrator driver.

    Returns
    -------
    ts : (N,) float array
        Uniform time stamps from t0 to t1 (inclusive if divisible by h).
    ys : (N, d) float array
        States corresponding to ts.
    """
    method = method.lower()
    if method not in _STEPPERS:
        raise ValueError(f"Unknown method '{method}'. Choose from {list(_STEPPERS)}")
    stepper = _STEPPERS[method]

    y = np.asarray(y0, dtype=float).copy()
    if y.ndim != 1:
        raise ValueError("y0 must be a 1‑D array-like (state vector).")

    # Build uniform grid
    n_steps = int(np.floor((t1 - t0) / h + 1e-12))
    ts = np.linspace(t0, t0 + n_steps*h, n_steps + 1)
    ys = np.empty((n_steps + 1, y.size), dtype=float)
    ys[0] = y

    t = t0
    for i in range(n_steps):
        y = stepper(f, t, y, h)
        t = t + h
        ys[i+1] = y

    # If t1 not exactly on the grid, do one final partial step (same method) to reach t1
    rem = (t1 - (t0 + n_steps*h))
    if rem > 1e-14:
        y = stepper(f, ts[-1], ys[-1], rem)
        ts = np.append(ts, t1)
        ys = np.vstack([ys, y])

    return ts, ys
