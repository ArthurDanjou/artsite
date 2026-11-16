/**
 * Test accuracy recorded by Krum's orchestrator for the NIPS 2017 Spambase
 * reproduction. Values are [round, accuracy] pairs evaluated every 15 rounds
 * over 300 rounds, copied from
 * results/krum_2017_nips_spambase/metrics/test_accuracy.csv, recorded with
 * krum 0.10.0 at commit b1f4a8e (seed 42, n = 20 workers, f = 6 Byzantine
 * workers under a sign-flip attack).
 */
export type AccuracyPoint = readonly [round: number, accuracy: number]

export const KRUM_SPAMBASE_ROUNDS = 300
export const KRUM_SPAMBASE_WORKERS = 20
export const KRUM_SPAMBASE_BYZANTINE = 6

/** No adversary: MultiKrum runs with m = n and coincides with Average. */
export const KRUM_CLEAN_ACCURACY: readonly AccuracyPoint[] = [
  [0, 0.4311],
  [15, 0.5255],
  [30, 0.5765],
  [45, 0.6287],
  [60, 0.645],
  [75, 0.6732],
  [90, 0.7025],
  [105, 0.7068],
  [120, 0.7231],
  [135, 0.7448],
  [150, 0.7579],
  [165, 0.7676],
  [180, 0.7742],
  [195, 0.7894],
  [210, 0.7915],
  [225, 0.797],
  [240, 0.8024],
  [255, 0.8056],
  [270, 0.8176],
  [285, 0.8241]
]

/** Same run with six of the twenty workers replaced by sign-flip attackers. */
export const KRUM_ATTACKED_ACCURACY = {
  average: [
    [0, 0.4224],
    [15, 0.3985],
    [30, 0.4039],
    [45, 0.4039],
    [60, 0.5961],
    [75, 0.5961],
    [90, 0.5961],
    [105, 0.5961],
    [120, 0.5961],
    [135, 0.5961],
    [150, 0.5961],
    [165, 0.5961],
    [180, 0.5961],
    [195, 0.5961],
    [210, 0.5961],
    [225, 0.5961],
    [240, 0.5961],
    [255, 0.5961],
    [270, 0.5961],
    [285, 0.5961]
  ] as readonly AccuracyPoint[],
  multiKrum: [
    [0, 0.43],
    [15, 0.4604],
    [30, 0.5157],
    [45, 0.5689],
    [60, 0.6069],
    [75, 0.6298],
    [90, 0.6504],
    [105, 0.658],
    [120, 0.6873],
    [135, 0.7036],
    [150, 0.7101],
    [165, 0.7275],
    [180, 0.7394],
    [195, 0.7503],
    [210, 0.7524],
    [225, 0.759],
    [240, 0.759],
    [255, 0.7622],
    [270, 0.7698],
    [285, 0.772]
  ] as readonly AccuracyPoint[]
}
