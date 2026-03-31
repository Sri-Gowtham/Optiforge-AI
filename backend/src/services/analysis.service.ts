import prisma from '../prisma/client';
import { generateAISuggestions } from './ai.service';

// ─── Types ────────────────────────────────────────────────

interface RuleBasedSuggestion {
    title: string;
    description: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
    impact: string;
    source: 'RULE_BASED';
}

interface AISuggestionInput {
    title: string;
    description: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
    impact: string;
    source: 'AI';
}

type SuggestionInput = RuleBasedSuggestion | AISuggestionInput;

// ─── Rule-Based Engine ────────────────────────────────────

/**
 * Generates deterministic, rule-based suggestions from raw project metrics.
 * This is the original system and must always run regardless of AI availability.
 */
function generateRuleBasedSuggestions(
    score: number,
    costEstimate: number,
    issuesCount: number
): RuleBasedSuggestion[] {
    const suggestions: RuleBasedSuggestion[] = [];

    // ── Score Rules ──────────────────────────────────────
    if (score < 40) {
        suggestions.push({
            title: 'Critical Optimization Required',
            description:
                'The project optimization score is critically low (below 40). Immediate architectural review is needed to address fundamental inefficiencies in the design and implementation.',
            severity: 'HIGH',
            impact: 'Could improve overall score by 30–50 points with targeted refactoring.',
            source: 'RULE_BASED',
        });
    } else if (score < 70) {
        suggestions.push({
            title: 'Moderate Performance Improvements Needed',
            description:
                'The project score is below the recommended threshold of 70. Review resource allocation, eliminate redundant processes, and optimize critical paths.',
            severity: 'MEDIUM',
            impact: 'Expected score improvement of 15–25 points after optimizations.',
            source: 'RULE_BASED',
        });
    } else {
        suggestions.push({
            title: 'Maintain High Optimization Standards',
            description:
                'The project is performing well. Continue monitoring performance metrics and apply incremental improvements to sustain quality over time.',
            severity: 'LOW',
            impact: 'Prevents score degradation and maintains competitive quality level.',
            source: 'RULE_BASED',
        });
    }

    // ── Cost Rules ───────────────────────────────────────
    if (costEstimate > 50000) {
        suggestions.push({
            title: 'High Cost — Budget Restructuring Recommended',
            description:
                'Estimated cost exceeds $50,000. Evaluate cloud resource tier-downs, review vendor contracts, and identify services that can be consolidated or replaced with open-source alternatives.',
            severity: 'HIGH',
            impact: 'Potential cost savings of 20–35% through infrastructure optimization.',
            source: 'RULE_BASED',
        });
    } else if (costEstimate > 10000) {
        suggestions.push({
            title: 'Review Cost Efficiency',
            description:
                'Current cost estimate is above $10,000. Analyse usage patterns, consider reserved instances or committed use discounts, and eliminate idle resources.',
            severity: 'MEDIUM',
            impact: 'Estimated savings of 10–20% with usage-based optimizations.',
            source: 'RULE_BASED',
        });
    } else {
        suggestions.push({
            title: 'Cost Within Acceptable Range',
            description:
                'Project cost is within healthy bounds. Continue tracking burn rate as features scale and set budget alerts for early warning.',
            severity: 'LOW',
            impact: 'Sustained cost awareness prevents unexpected scaling surprises.',
            source: 'RULE_BASED',
        });
    }

    // ── Issues Rules ─────────────────────────────────────
    if (issuesCount > 10) {
        suggestions.push({
            title: 'Issue Backlog Critically High',
            description:
                'More than 10 open issues detected. Prioritise a dedicated sprint for bug resolution and root-cause analysis to prevent compounding technical debt.',
            severity: 'HIGH',
            impact: 'Reducing backlog below 5 typically improves delivery velocity by up to 40%.',
            source: 'RULE_BASED',
        });
    } else if (issuesCount > 5) {
        suggestions.push({
            title: 'Active Issues Require Attention',
            description:
                'Between 5 and 10 issues are open. Schedule regular triage sessions and assign owners to each issue to prevent escalation.',
            severity: 'MEDIUM',
            impact: 'Proactive resolution reduces risk of production incidents.',
            source: 'RULE_BASED',
        });
    } else if (issuesCount > 0) {
        suggestions.push({
            title: 'Minor Issues Detected',
            description:
                'A small number of open issues exist. These are manageable but should be addressed in the next regular sprint cycle.',
            severity: 'LOW',
            impact: 'Keeps codebase clean and prevents minor issues from compounding.',
            source: 'RULE_BASED',
        });
    }

    return suggestions;
}

// ─── Score & Metrics Calculator ───────────────────────────

/**
 * Calculates the analysis score and estimates from project data.
 * In a real system, this would use actual metrics from the project.
 * For now it provides a deterministic baseline from known inputs.
 */
function calculateMetrics(description?: string | null): {
    score: number;
    costEstimate: number;
    issuesCount: number;
} {
    // Deterministic score based on description length (proxy for project maturity)
    const descLength = description?.length ?? 0;
    const score = Math.min(100, Math.max(10, 30 + (descLength / 10) * 2.5));
    const costEstimate = parseFloat((5000 + descLength * 50).toFixed(2));
    const issuesCount = Math.max(0, 15 - Math.floor(descLength / 20));

    return { score, costEstimate, issuesCount };
}

// ─── Main Analysis Function ───────────────────────────────

/**
 * Runs full analysis for a project:
 *  1. Calculates metrics
 *  2. Generates rule-based suggestions (always)
 *  3. Calls AI service to augment with AI suggestions (graceful fallback)
 *  4. Persists everything to the database
 *  5. Returns the complete analysis with merged suggestions
 */
export async function runAnalysis(projectId: string, userId: string) {
    // ① Verify project ownership
    const project = await prisma.project.findFirst({
        where: { id: projectId, userId },
    });

    if (!project) {
        const err = new Error('Project not found or access denied') as Error & { statusCode: number };
        err.statusCode = 404;
        throw err;
    }

    // ② Calculate analysis metrics
    const { score, costEstimate, issuesCount } = calculateMetrics(project.description);

    // ③ Generate RULE-BASED suggestions (always runs, never fails)
    const ruleSuggestions = generateRuleBasedSuggestions(score, costEstimate, issuesCount);

    // ④ Generate AI suggestions (best-effort, graceful fallback to [])
    console.log('[Analysis Service] Requesting AI suggestions…');
    const aiRaw = await generateAISuggestions({
        projectName: project.name,
        description: project.description ?? '',
        score,
        costEstimate,
        issuesCount,
    });

    const aiSuggestions: AISuggestionInput[] = aiRaw.map((s) => ({
        ...s,
        source: 'AI' as const,
    }));

    // ⑤ Merge rule + AI results
    const allSuggestions: SuggestionInput[] = [...ruleSuggestions, ...aiSuggestions];

    // ⑥ Persist to database in a single transaction
    const analysis = await prisma.analysis.create({
        data: {
            projectId,
            score,
            costEstimate,
            issuesCount,
            suggestions: {
                create: allSuggestions.map((s) => ({
                    title: s.title,
                    description: s.description,
                    severity: s.severity,
                    impact: s.impact,
                    source: s.source,
                })),
            },
        },
        include: {
            suggestions: {
                orderBy: [{ source: 'asc' }, { severity: 'desc' }],
            },
        },
    });

    console.log(
        `[Analysis Service] Analysis complete — ` +
            `score=${score.toFixed(1)}, ` +
            `rule=${ruleSuggestions.length}, ` +
            `ai=${aiSuggestions.length}`
    );

    return analysis;
}

/**
 * Retrieves a previously run analysis by its ID, scoped to project ownership.
 */
export async function getAnalysis(analysisId: string, userId: string) {
    const analysis = await prisma.analysis.findFirst({
        where: {
            id: analysisId,
            project: { userId },
        },
        include: {
            suggestions: {
                orderBy: [{ source: 'asc' }, { severity: 'desc' }],
            },
        },
    });

    if (!analysis) {
        const err = new Error('Analysis not found or access denied') as Error & { statusCode: number };
        err.statusCode = 404;
        throw err;
    }

    return analysis;
}

/**
 * Lists all analyses for a given project scoped to the requesting user.
 */
export async function getProjectAnalyses(projectId: string, userId: string) {
    // Verify project ownership first
    const project = await prisma.project.findFirst({
        where: { id: projectId, userId },
    });

    if (!project) {
        const err = new Error('Project not found or access denied') as Error & { statusCode: number };
        err.statusCode = 404;
        throw err;
    }

    return prisma.analysis.findMany({
        where: { projectId },
        include: {
            suggestions: {
                orderBy: [{ source: 'asc' }, { severity: 'desc' }],
            },
        },
        orderBy: { createdAt: 'desc' },
    });
}
