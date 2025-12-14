.PHONY: help install dev build start lint format typecheck test test-watch test-ui test-coverage validate clean

# Default target
help:
	@echo "Brian's Tech Corner - Available Commands"
	@echo ""
	@echo "Development:"
	@echo "  make install       - Install dependencies"
	@echo "  make dev           - Start development server"
	@echo "  make build         - Build for production"
	@echo "  make start         - Start production server"
	@echo ""
	@echo "Code Quality:"
	@echo "  make lint          - Run ESLint"
	@echo "  make format        - Format code with Prettier"
	@echo "  make typecheck     - Run TypeScript type checking"
	@echo "  make test          - Run all tests"
	@echo "  make test-watch    - Run tests in watch mode"
	@echo "  make test-ui       - Run tests with UI"
	@echo "  make test-coverage - Run tests with coverage report"
	@echo "  make validate      - Validate blog post frontmatter"
	@echo ""
	@echo "Utilities:"
	@echo "  make clean         - Remove build artifacts"
	@echo "  make check-all     - Run all checks (lint, typecheck, test, validate)"
	@echo ""

# Installation
install:
	@echo "Installing dependencies..."
	corepack enable
	pnpm install

# Development
dev:
	@echo "Starting development server..."
	pnpm dev

build:
	@echo "Building for production..."
	pnpm build

start:
	@echo "Starting production server..."
	pnpm start

# Code Quality
lint:
	@echo "Running ESLint..."
	pnpm lint

format:
	@echo "Formatting code..."
	pnpm format

typecheck:
	@echo "Running TypeScript type checking..."
	pnpm typecheck

# Testing
test:
	@echo "Running tests..."
	pnpm test

test-watch:
	@echo "Running tests in watch mode..."
	pnpm test:watch

test-ui:
	@echo "Opening test UI..."
	pnpm test:ui

test-coverage:
	@echo "Generating test coverage report..."
	pnpm test:coverage

# Validation
validate:
	@echo "Validating blog posts..."
	pnpm validate

# Utilities
clean:
	@echo "Cleaning build artifacts..."
	rm -rf .next
	rm -rf node_modules/.cache
	rm -rf coverage

# Run all checks (useful before committing)
check-all: lint typecheck test validate
	@echo ""
	@echo "✅ All checks passed!"
