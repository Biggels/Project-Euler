def main():
    print(sum(multiples_of(3) | multiples_of(5)))


def multiples_of(n):
    return set([i * n for i in range(1, 999 // n + 1)])


if __name__ == "__main__":
    main()
