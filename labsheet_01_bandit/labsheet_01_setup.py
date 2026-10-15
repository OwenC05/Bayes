# setup_cw0
#
# Define the K-arm bandit classes
#
from abc import ABC, abstractmethod

import numpy as np
from scipy import stats


# A base class for different bandit types
#
class Bandit(ABC):
    def __init__(self, arms, seed):
        self.K = arms
        self._seed = seed
        self._setting = seed
        
    def reinitialise(self, setting):
        self._setting = self._seed + setting
        self.randomise()

    def pull(self, lever):
        if lever < 0 or lever >= self.K:
            raise ValueError("Lever parameter is invalid: ", lever)
        return self.pull_lever(lever)

    @abstractmethod
    def randomise(self):
        raise NotImplementedError

    @abstractmethod
    def pull_lever(self, lever):
        raise NotImplementedError

    # This is the expected return if levers are pulled at random
    @abstractmethod
    def mean_return(self):
        raise NotImplementedError

    # This is the expected return if the best lever is pulled
    @abstractmethod
    def max_return(self):
        raise NotImplementedError


class BernoulliBandit(Bandit):
    def __init__(self, arms, seed=0, payout=25):
        super().__init__(arms, seed)
        self._Theta = None
        self._fixedPayout = payout  # Arbitrary
        self.randomise()

    def randomise(self):
        # Payout parameters are a probability of success for each arm
        self._Theta = stats.uniform.rvs(loc=0, scale=1, size=self.K,
                                        random_state=self._setting)
        
    def pull_lever(self, lever):
        p = stats.bernoulli.rvs(self._Theta[lever])
        return p*self._fixedPayout

    def mean_return(self):
        return np.mean(self._Theta)*self._fixedPayout

    def max_return(self):
        return np.max(self._Theta)*self._fixedPayout


class GammaBandit(Bandit):
    def __init__(self, arms, seed=0, shape=5):
        super().__init__(arms, seed)
        self._alpha = shape
        self._Beta = None
        self.randomise()

    def randomise(self):
        #
        # Payout parameters are the "rates" (1/scales in scipy.stats) for each arm
        #
        # The mean payout for an arm will be alpha/beta; default 5/beta.
        # So let's choose beta uniformly between 0.1 (payout 50) and 5 (payout 1)
        #
        self._Beta = stats.uniform.rvs(loc=0.1, scale=4.9,
                                       size=self.K, random_state=self._setting)

    def pull_lever(self, lever):
        # Note that stats.gamma is parameterised in terms of "scale"
        return stats.gamma.rvs(a=self._alpha, scale=1/self._Beta[lever])

    def mean_return(self):
        return np.mean(self._alpha/self._Beta)

    def max_return(self):
        return np.max(self._alpha/self._Beta)


class GaussBandit(Bandit):
    def __init__(self, arms, seed=0, sigma=5.0):
        super().__init__(arms, seed)
        self._sigma_true = sigma
        self._arm_mu = 10
        self._arm_std = 4
        self._Mu = None
        self._Std = None
        self.randomise()

    def randomise(self):
        # Payout parameters are a mean and std dev for each arm
        self._Mu = stats.norm.rvs(loc=self._arm_mu, scale=self._arm_std, size=self.K,
                                  random_state=self._setting)
        self._Std = np.sqrt(self._sigma_true)*np.ones(self.K)

    def pull_lever(self, lever):
        return stats.norm.rvs(loc=self._Mu[lever], scale=self._Std[lever])

    def mean_return(self):
        return np.mean(self._Mu)

    def max_return(self):
        return np.max(self._Mu)


#
# Base class for different selector types
#
class Selector(ABC):
    def __init__(self, name, arms):
        # Stores a name (used in plots) and number of arms K
        self.name = name
        self.K = arms

    @abstractmethod
    def lever_select(self):
        """Returns the lever choice"""
        raise NotImplementedError

    @abstractmethod
    def update_state(self, lever, payout):
        """Updates state given lever and payout"""
        raise NotImplementedError

    @abstractmethod
    def reset_state(self):
        """Resets internal state for another run (experimental assessment)"""
        raise NotImplementedError
